import { adjectives, animals, uniqueNamesGenerator } from 'unique-names-generator';

import { V1Template } from '@kubevirt-ui/kubevirt-api/console';
import VirtualMachineModel from '@kubevirt-ui/kubevirt-api/console/models/VirtualMachineModel';
import { V1Disk, V1Network, V1VirtualMachine } from '@kubevirt-ui/kubevirt-api/kubevirt';
import { getAnnotation, getLabel } from '@kubevirt-utils/resources/shared';

import { ANNOTATIONS } from './annotations';
import {
  FLAVORS,
  OS_NAME_TYPES,
  TEMPLATE_BASE_IMAGE_NAME_PARAMETER,
  TEMPLATE_DATA_SOURCE_NAME_PARAMETER,
  TEMPLATE_DEFAULT_VARIANT_LABEL,
  TEMPLATE_FLAVOR_LABEL,
  TEMPLATE_WORKLOAD_LABEL,
  WORKLOADS,
} from './constants';

/**
 * A selector that returns the VirtualMachine object of a given template
 * @param {V1Template} template - template
 */
export const getTemplateVirtualMachineObject = (template: V1Template): V1VirtualMachine =>
  template?.objects?.find((obj) => obj.kind === VirtualMachineModel.kind);

/**
 * returns true if the given template is a default variant
 * @param {V1Template} template - template
 */
export const isDefaultVariantTemplate = (template: V1Template): boolean =>
  template?.metadata?.labels?.[TEMPLATE_DEFAULT_VARIANT_LABEL] === 'true';

/**
 * A selector that returns the os label name of a given template
 * @param {V1Template} template - template
 */
export const getTemplateOSLabelName = (template: V1Template): string =>
  getLabel(template, ANNOTATIONS.osTemplate, template?.metadata?.name);

/**
 * A selector that returns the template provider name of a given template
 * @param {V1Template} template - template
 */
export const getTemplateProviderName = (template: V1Template): string =>
  getAnnotation(template, ANNOTATIONS.providerDisplayName, template?.metadata?.name);

/**
 * A selector that returns the support level of a given template
 * @param {V1Template} template - template
 */
export const getTemplateSupportLevel = (template: V1Template): string =>
  getAnnotation(template, ANNOTATIONS.supportLevel);

/**
 * A selector that returns the flavor of a given template
 * @param {V1Template} template - template
 */
export const getTemplateFlavor = (template: V1Template): string => {
  // eslint-disable-next-line require-jsdoc
  const isFlavorExist = (flavor: string) =>
    getLabel(template, `${TEMPLATE_FLAVOR_LABEL}/${flavor}`) === 'true';

  return Object.values(FLAVORS).find((flavor) => isFlavorExist(flavor)) ?? 'unknown';
};

/**
 * A selector that returns the workload of a given template
 * @param {V1Template} template - template
 */
export const getTemplateWorkload = (template: V1Template): string => {
  // eslint-disable-next-line require-jsdoc
  const isWorkloadExist = (workload: string) =>
    getLabel(template, `${TEMPLATE_WORKLOAD_LABEL}/${workload}`) === 'true';

  return Object.values(WORKLOADS).find((flavor) => isWorkloadExist(flavor)) ?? 'unknown';
};

/**
 * A selector that returns the os label of a given template
 * @param {V1Template} template - template
 */
export const getTemplateOS = (template: V1Template): string => {
  return (
    Object.values(OS_NAME_TYPES).find((osName) =>
      getTemplateOSLabelName(template).includes(osName),
    ) ?? OS_NAME_TYPES.other
  );
};

/**
 * A selector that returns the network interfaces of a given template
 * @param {V1Template} template - template
 */
export const getTemplateNetworkInterfaces = (template: V1Template): V1Network[] => {
  return getTemplateVirtualMachineObject(template)?.spec?.template?.spec?.networks ?? [];
};

/**
 * A selector that returns the disks of a given template
 * @param {V1Template} template - template
 */
export const getTemplateDisks = (template: V1Template): V1Disk[] => {
  return (
    getTemplateVirtualMachineObject(template)?.spec?.template?.spec?.domain?.devices?.disks ?? []
  );
};

/**
 * A selector that returns the value of a given template's parameter
 * @param {V1Template} template - template
 * @param {string} parameter - parameter name
 */
export const getTemplateParameterValue = (template: V1Template, parameter: string): string => {
  return template?.parameters?.find((param) => param.name === parameter)?.value ?? '';
};

/**
 * A selector that returns the documentation URL of a given template
 * @param {V1Template} template - template
 */
export const getTemplateDocumentationURL = (template: V1Template): string =>
  getAnnotation(template, ANNOTATIONS.documentationURL);

/**
 * A selector that returns the name of a given template
 * @param {V1Template} template - template
 */
export const getTemplateName = (template: V1Template): string =>
  getAnnotation(template, ANNOTATIONS.displayName, template?.metadata?.name);

/**
 * A selector that returns the PVC name of a given template's base image
 * @param {V1Template} template - template
 */
export const getTemplatePVCName = (template: V1Template): string =>
  getTemplateParameterValue(template, TEMPLATE_BASE_IMAGE_NAME_PARAMETER) ||
  getTemplateParameterValue(template, TEMPLATE_DATA_SOURCE_NAME_PARAMETER);

/**
 * A selector that returns the description of a given template
 * @param {V1Template} template - template
 */
export const getTemplateDescription = (template: V1Template): string =>
  getAnnotation(template, ANNOTATIONS.description);

/**
 * A function for generating a unique vm name
 * @param {V1Template} template - template
 * @returns a unique vm name
 */
export const generateVMName = (template: V1Template): string => {
  return `${getTemplatePVCName(template) ?? template?.metadata?.name}-${uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: '-',
  })}`;
};
