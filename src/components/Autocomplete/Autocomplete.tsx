import { ChangeEvent, FormEvent, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, HintsList } from '../HintsList/HintsList.tsx';
import debounce from 'lodash.debounce';
import { InputForm } from '../InputForm/InputForm.tsx';
import { getHints } from '../../utils/getHints.ts';

interface InputProps {
	value: string;
	onChange(arg: string): void;
	className?: string;
}

export const Autocomplete = ({ value, onChange, className = '' }: InputProps) => {
	const [hints, setHints] = useState<string[]>([]);
	const [hintText, setHintText] = useState<string>('');
	const ref = useRef<HTMLInputElement>(null);
	const dimensions = useRef<Dimensions>({ top: '', left: '', width: '' });

	const debounced = debounce(() => setHints(getHints), 400);

	useLayoutEffect(() => {
		if (!ref.current) return;
		const { width, bottom, left } = ref.current.getBoundingClientRect();
		dimensions.current = { top: `${bottom}px`, left: `${left}px`, width: `${width}px` };
	}, []);

	const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
		onChange(evt.target.value);
		if (!hints.length) debounced();
	};

	const relevantHints = useMemo(() => (value ? hints.filter(hint => hint.startsWith(value)) : []), [hints, value]);

	useEffect(() => setHintText(relevantHints.length ? relevantHints[0] : ''), [relevantHints]);

	const selectHandler = useCallback(
		(arg: string) => {
			onChange(arg);
			setHints([]);
		},
		[onChange]
	);

	const submitHandler = (evt: FormEvent) => {
		evt.preventDefault();
		setHints([]);
	};

	return (
		<>
			<InputForm
				value={value}
				changeHandler={changeHandler}
				submitHandler={submitHandler}
				hintText={hintText}
				className={className}
				ref={ref}
			/>
			{relevantHints.length ? (
				<HintsList
					list={relevantHints}
					dimensions={dimensions.current}
					onSelect={selectHandler}
					setHintText={setHintText}
				/>
			) : null}
		</>
	);
};
