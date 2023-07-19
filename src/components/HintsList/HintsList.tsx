import { CSSProperties, useEffect, useRef, useState } from 'react';
import styles from './HintList.module.css';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';

export interface Dimensions {
	top: string;
	left: string;
	width: string;
}

interface HintsListProps {
	dimensions: Dimensions;
	list: string[];
	onSelect(arg: string): void;
	setHintText(arg: string): void;
}
export const HintsList = ({ dimensions, list, onSelect, setHintText }: HintsListProps) => {
	const [active, setActive] = useState<string>('');
	const ref = useRef<HTMLUListElement>(null);

	useEffect(() => {
		const handler = () => {
			if (active) onSelect(active);
		};
		document.addEventListener('click', handler);
		return () => document.removeEventListener('click', handler);
	}, [active, onSelect]);
	const selectHandler = (arg: string) => () => onSelect(arg);
	const mouseEnterHandler = (arg: string) => () => {
		setActive(arg);
		setHintText(arg);
	};

	return createPortal(
		<ul
			ref={ref}
			className={styles.hintsList}
			style={
				{
					'--width': dimensions.width,
					'--top': dimensions.top,
					'--left': dimensions.left,
				} as CSSProperties
			}
		>
			{list.map(hint => (
				<li
					onMouseEnter={mouseEnterHandler(hint)}
					onClick={selectHandler(hint)}
					className={clsx(styles.hintItem, { [styles.active]: active === hint })}
					key={hint}
				>
					{hint}
				</li>
			))}
		</ul>,
		document.body
	);
};
