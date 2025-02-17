import * as React from 'react';

import { V1VirtualMachineInstance } from '@kubevirt-ui/kubevirt-api/kubevirt';
import { HorizontalNav, useK8sWatchResource } from '@openshift-console/dynamic-plugin-sdk';

import useVirtualMachinesInstanceTabs from './hooks/useVirtualMachinesInstanceTabs';
import VirtualMachinesInstancePageHeader from './VirtualMachinesInstancePageHeader';

type VirtualMachinesInstanceDetailsProps = {
  kind: string;
  name: string;
  namespace: string;
};

const VirtualMachinesInstanceDetails: React.FC<VirtualMachinesInstanceDetailsProps> = ({
  kind,
  name,
  namespace,
}) => {
  const [vmi] = useK8sWatchResource<V1VirtualMachineInstance>({
    kind,
    name,
    namespace,
  });

  const tabs = useVirtualMachinesInstanceTabs();

  return (
    <>
      <VirtualMachinesInstancePageHeader name={name} />
      <HorizontalNav pages={tabs} resource={vmi} />
    </>
  );
};

export default VirtualMachinesInstanceDetails;
