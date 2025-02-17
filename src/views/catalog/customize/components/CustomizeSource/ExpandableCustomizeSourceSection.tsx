import * as React from 'react';

import { useKubevirtTranslation } from '@kubevirt-utils/hooks/useKubevirtTranslation';
import {
  ExpandableSection,
  ExpandableSectionToggle,
  Flex,
  FlexItem,
  Popover,
  PopoverPosition,
  Stack,
  StackItem,
} from '@patternfly/react-core';
import { HelpIcon } from '@patternfly/react-icons';

import { CustomizeSource, CustomizeSourceProps } from './CustomizeSource';

export const ExpandableCustomizeSourceSection: React.FC<CustomizeSourceProps> = ({
  onChange,
  initialVolumeQuantity,
}) => {
  const { t } = useKubevirtTranslation();
  const [storageFieldsExpanded, setStorageFieldsExpanded] = React.useState(true);
  return (
    <Stack hasGutter>
      <StackItem>
        <Flex>
          <FlexItem spacer={{ default: 'spacerNone' }}>
            <ExpandableSectionToggle
              isExpanded={storageFieldsExpanded}
              onToggle={() => setStorageFieldsExpanded(!storageFieldsExpanded)}
            >
              {t('Storage')}
            </ExpandableSectionToggle>
          </FlexItem>
          <FlexItem>
            <Popover
              position={PopoverPosition.top}
              aria-label="Condition Popover"
              bodyContent={() => (
                <div>
                  {t(
                    'You can customize the templates storage by overriding the original parameters',
                  )}
                </div>
              )}
            >
              <HelpIcon />
            </Popover>
          </FlexItem>
        </Flex>
      </StackItem>
      <StackItem>
        <ExpandableSection
          data-test-id="expandable-storage-section"
          isExpanded={storageFieldsExpanded}
          isDetached
        >
          <CustomizeSource onChange={onChange} initialVolumeQuantity={initialVolumeQuantity} />
        </ExpandableSection>
      </StackItem>
    </Stack>
  );
};
