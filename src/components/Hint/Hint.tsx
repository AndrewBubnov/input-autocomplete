import { clsx } from 'clsx';
import styles from './Hint.module.css';

interface HintProps {
	onMouseEnter(): void;
	onClick(): void;
	hint: string;
	isActive: boolean;
	request: string;
}

export const Hint = ({ onMouseEnter, onClick, hint, isActive, request }: HintProps) => (
	<li
		onMouseEnter={onMouseEnter}
		onClick={onClick}
		className={clsx(styles.hintItem, { [styles.active]: isActive })}
		id={hint}
	>
		<span>{hint.slice(0, request.length)}</span>
		<b>{hint.slice(request.length)}</b>
	</li>
);
