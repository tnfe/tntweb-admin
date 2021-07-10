import * as React from 'react';
import { useC2DefaultMod } from 'services/concent';
import { waterMarkLabel } from 'configs/constant/sys';
import { EmptyView } from 'components/dumb/general';
import styles from '../styles/App.module.css';

const MarkGrid = (props: { label: string }) => <div className={styles.wmGrid}>{props.label}</div>;

function WaterMark() {
  const { globalState } = useC2DefaultMod();
  if (!globalState.allowWaterMark) {
    return <EmptyView />;
  }

  return (
    <div className={styles.waterMarkWrap}>
      <MarkGrid label={waterMarkLabel} />
      <MarkGrid label={waterMarkLabel} />
      <MarkGrid label={waterMarkLabel} />
      <MarkGrid label={waterMarkLabel} />
      <MarkGrid label={waterMarkLabel} />
      <MarkGrid label={waterMarkLabel} />
    </div>
  );
}

export default React.memo(WaterMark);
