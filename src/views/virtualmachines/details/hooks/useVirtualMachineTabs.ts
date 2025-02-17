import * as React from 'react';

import { useKubevirtTranslation } from '@kubevirt-utils/hooks/useKubevirtTranslation';

import VirtualMachineDetailsPage from '../tabs/details/VirtualMachineDetailsPage';
import DiskListPage from '../tabs/disk/tables/disk/DiskListPage';
import NetworkInterfaceListPage from '../tabs/network/NetworkInterfaceListPage';
import VirtualMachinesOverviewTab from '../tabs/overview/VirtualMachinesOverviewTab';
import SnapshotListPage from '../tabs/snapshots/SnapshotListPage';

export const useVirtualMachineTabs = () => {
  const { t } = useKubevirtTranslation();

  const tabs = React.useMemo(
    () => [
      {
        href: '',
        name: t('Overview'),
        component: VirtualMachinesOverviewTab,
      },
      {
        href: 'details',
        name: t('Details'),
        component: VirtualMachineDetailsPage,
      },
      {
        href: 'yaml',
        name: 'YAML',
        component: React.Fragment,
      },
      {
        href: 'enviornment',
        name: t('Enviornment'),
        component: React.Fragment,
      },
      {
        href: 'events',
        name: t('Events'),
        component: React.Fragment,
      },
      {
        href: 'console',
        name: t('Console'),
        component: React.Fragment,
      },
      {
        href: 'network-interfaces',
        name: t('Network Interfaces'),
        component: NetworkInterfaceListPage,
      },
      {
        href: 'disks',
        name: t('Disks'),
        component: DiskListPage,
      },
      {
        href: 'snapshots',
        name: t('Snapshots'),
        component: SnapshotListPage,
      },
    ],
    [t],
  );

  return tabs;
};
