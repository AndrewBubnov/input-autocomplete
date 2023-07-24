import { CSSProperties, useEffect, useRef, useState } from 'react';
import styles from './HintList.module.css';
import { createPortal } from 'react-dom';
import { ARROW_DOWN, ARROW_UP } from '../../constants.ts';
import { Hint } from '../Hint/Hint.tsx';

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
	request: string;
}

export const HintList = ({ dimensions, list, onSelect, setHintText, request }: HintsListProps) => {
	const [active, setActive] = useState<string>('');
	const ref = useRef<HTMLUListElement>(null);

	useEffect(() => {
		const handler = () => {
			if (active) onSelect(active);
		};
		const arrowHandler = (e: KeyboardEvent) => {
			if (e.key === ARROW_DOWN || e.key === ARROW_UP) {
				setActive(prevState => {
					const index = list.indexOf(prevState);
					if (e.key === ARROW_DOWN) return list[index + 1 > list.length - 1 ? 0 : index + 1];
					return list[index ? index - 1 : list.length - 1];
				});
			}
		};
		document.addEventListener('click', handler);
		document.addEventListener('keydown', arrowHandler);
		return () => {
			document.removeEventListener('click', handler);
			document.removeEventListener('keydown', arrowHandler);
		};
	}, [active, onSelect, list]);

	useEffect(() => {
		if (active) setHintText(active);
	}, [active, setHintText]);

	useEffect(() => document.getElementById(active)?.scrollIntoView({ block: 'nearest' }), [active]);

	const selectHandler = (arg: string) => () => onSelect(arg);
	const mouseEnterHandler = (arg: string) => () => setActive(arg);

	return createPortal(
		<ul
			ref={ref}
			className={styles.hintList}
			style={
				{
					'--width': dimensions.width,
					'--top': dimensions.top,
					'--left': dimensions.left,
				} as CSSProperties
			}
		>
			{list.map(hint => (
				<Hint
					key={hint}
					request={request}
					onMouseEnter={mouseEnterHandler(hint)}
					onClick={selectHandler(hint)}
					hint={hint}
					isActive={active === hint}
				/>
			))}
		</ul>,
		document.body
	);
};
