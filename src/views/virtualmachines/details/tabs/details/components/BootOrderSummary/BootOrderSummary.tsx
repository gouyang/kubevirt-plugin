import * as React from 'react';

import { V1VirtualMachine } from '@kubevirt-ui/kubevirt-api/kubevirt';
import { getDisks, getInterfaces } from '@kubevirt-utils/resources/vm';

import { transformDevices } from '../../utils/bootOrderHelper';
import BootableDevicesList from '../BootableDevicesList/BootableDevicesList';

import EmptyBootOrderSummary from './EmptyBootSourceSummary';

type BootOrderSummaryProps = {
  vm: V1VirtualMachine;
};

const BootOrderSummary: React.FC<BootOrderSummaryProps> = ({ vm }) => {
  const disks = getDisks(vm);
  const interfaces = getInterfaces(vm);

  const transformedDevices = transformDevices(disks, interfaces)?.sort(
    (a, b) => a?.value?.bootOrder - b?.value?.bootOrder,
  );

  const filtered = [...transformedDevices]?.filter((device) => device?.value?.bootOrder);

  const noDevices = filtered?.length === 0;
  return noDevices ? (
    <EmptyBootOrderSummary devices={transformedDevices} />
  ) : (
    <BootableDevicesList devices={filtered} />
  );
};

export default BootOrderSummary;
