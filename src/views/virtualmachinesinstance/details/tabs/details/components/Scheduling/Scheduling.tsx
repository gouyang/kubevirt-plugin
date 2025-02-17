import * as React from 'react';

import { V1VirtualMachineInstance } from '@kubevirt-ui/kubevirt-api/kubevirt';
import { useKubevirtTranslation } from '@kubevirt-utils/hooks/useKubevirtTranslation';
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Grid,
  GridItem,
  Title,
} from '@patternfly/react-core';
import { LinkIcon } from '@patternfly/react-icons';

import Affinity from './Affinity/Affinity';
import Descheduler from './Descheduler/Descheduler';
import DedicatedResources from './DeticatedResources/DedicatedResources';
import EvictionStrategy from './EvictionStrategy/EvictionStrategy';
import Flavor from './Flavor/Flavor';
import NodeSelector from './NodeSelector/NodeSelector';
import Tolerations from './Tolerations/Tolerations';

type SchedulingProps = {
  vmi: V1VirtualMachineInstance;
  pathname: string;
};

const Scheduling: React.FC<SchedulingProps> = ({ vmi, pathname }) => {
  const { t } = useKubevirtTranslation();

  return (
    <div>
      <a href={`${pathname}#scheduling`} className="link-icon">
        <LinkIcon size="sm" />
      </a>
      <Title headingLevel="h2" className="co-section-heading">
        {t('Scheduling and resources requirements')}
      </Title>
      <Grid>
        <GridItem span={6}>
          <DescriptionList>
            <DescriptionListGroup>
              <DescriptionListTerm>{t('Node Selector')}</DescriptionListTerm>
              <DescriptionListDescription>
                <NodeSelector vmi={vmi} />
              </DescriptionListDescription>
              <DescriptionListTerm>{t('Tolerations')}</DescriptionListTerm>
              <DescriptionListDescription>
                <Tolerations vmi={vmi} />
              </DescriptionListDescription>
              <DescriptionListTerm>{t('Affinity Rules')}</DescriptionListTerm>
              <DescriptionListDescription>
                <Affinity vmi={vmi} />
              </DescriptionListDescription>
              <DescriptionListTerm>{t('Descheduler')}</DescriptionListTerm>
              <DescriptionListDescription className="list-description">
                <Descheduler vmi={vmi} />
              </DescriptionListDescription>
            </DescriptionListGroup>
          </DescriptionList>
        </GridItem>
        <GridItem span={6}>
          <DescriptionList>
            <DescriptionListGroup>
              <DescriptionListTerm>{t('Flavor')}</DescriptionListTerm>
              <DescriptionListDescription>
                <Flavor vmi={vmi} />
              </DescriptionListDescription>
              <DescriptionListTerm>{t('Dedicated Resources')}</DescriptionListTerm>
              <DescriptionListDescription>
                <DedicatedResources vmi={vmi} />
              </DescriptionListDescription>
              <DescriptionListTerm>{t('Eviction Strategy')}</DescriptionListTerm>
              <DescriptionListDescription>
                <EvictionStrategy vmi={vmi} />
              </DescriptionListDescription>
            </DescriptionListGroup>
          </DescriptionList>
        </GridItem>
      </Grid>
    </div>
  );
};

export default Scheduling;
