import { CSSProperties, memo, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ARROW_DOWN, ARROW_UP } from 'constants.ts';
import { Hint } from 'components/Hint/Hint.tsx';
import { useClickOutside } from 'hooks/useClickOutside.ts';
import styles from './HintList.module.css';

export interface Dimensions {
	top: string;
	left: string;
	width: string;
}
interface HintsListProps {
	dimensions: Dimensions;
	list: string[];
	onSelect(arg: string): void;
	onClose(): void;
	setHintText(arg: string): void;
	request: string;
}

const HintListComponent = ({ dimensions, list, onSelect, onClose, setHintText, request }: HintsListProps) => {
	const [active, setActive] = useState<string>(list[0]);
	const ref = useRef<HTMLUListElement>(null);

	useClickOutside(ref, onClose);

	useEffect(() => {
		const arrowHandler = (e: KeyboardEvent) => {
			if (e.key === ARROW_DOWN || e.key === ARROW_UP) {
				setActive(prevState => {
					const index = list.indexOf(prevState);
					if (e.key === ARROW_DOWN) return list[index + 1 > list.length - 1 ? 0 : index + 1];
					return list[index ? index - 1 : list.length - 1];
				});
			}
		};
		document.addEventListener('keydown', arrowHandler);
		return () => document.removeEventListener('keydown', arrowHandler);
	}, [active, onSelect, list]);

	useEffect(() => setHintText(active), [active, setHintText]);

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

export const HintList = memo(HintListComponent);
