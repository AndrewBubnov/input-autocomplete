import { useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import styles from './Hint.module.css';

interface HintProps {
	onMouseEnter(): void;
	onClick(): void;
	hint: string;
	isActive: boolean;
	request: string;
}

export const Hint = ({ onMouseEnter, onClick, hint, isActive, request }: HintProps) => {
	const ref = useRef<HTMLLIElement>(null);

	useEffect(() => {
		if (!ref.current || !isActive) return;
		ref.current.scrollIntoView({ block: 'nearest' });
	}, [isActive]);

	return (
		<li
			ref={ref}
			onMouseEnter={onMouseEnter}
			onClick={onClick}
			className={clsx(styles.hintItem, { [styles.active]: isActive })}
		>
			<span>{hint.slice(0, request.length)}</span>
			<b>{hint.slice(request.length)}</b>
		</li>
	);
};
