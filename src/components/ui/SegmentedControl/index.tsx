import styles from './SegmentedControl.module.scss';

interface Option<T extends string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
}

interface SegmentedControlProps<T extends string> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}

export default function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <div className={styles.segmentedControl}>
      {options.map((option) => (
        <button
          key={option.value}
          className={`${styles.button} ${value === option.value ? styles.active : ''} ${option.icon ? styles.btnWithIcon : ''}`}
          onClick={() => onChange(option.value)}
        >
          {option.icon && <span>{option.icon}</span>}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
}
