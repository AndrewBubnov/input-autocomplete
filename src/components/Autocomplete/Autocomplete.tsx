import { ChangeEvent, FormEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Dimensions, HintList } from '../HintList/HintList.tsx';
import { InputForm } from '../InputForm/InputForm.tsx';
import { getHints } from '../../utils/getHints.ts';
import debounce from 'lodash.debounce';
import { DEBOUNCE_DELAY } from '../../constants.ts';

interface InputProps {
	value: string;
	onChange(arg: string): void;
	className?: string;
}

export const Autocomplete = ({ value, onChange, className = '' }: InputProps) => {
	const [hints, setHints] = useState<string[]>([]);
	const [currentHint, setCurrentHint] = useState<string>('');
	const request = useRef<string>('');

	const ref = useRef<HTMLInputElement>(null);
	const dimensions = useRef<Dimensions>({ top: '', left: '', width: '' });

	useLayoutEffect(() => {
		if (!ref.current) return;
		const { width, bottom, left } = ref.current.getBoundingClientRect();
		dimensions.current = { top: `${bottom}px`, left: `${left}px`, width: `${width}px` };
	}, []);

	useEffect(() => {
		if (!ref.current || !currentHint) return;
		ref.current.setSelectionRange(request.current.length, currentHint.length);
	}, [currentHint]);

	const debounced = useCallback(
		(req: string) => debounce(async () => setHints(await getHints(req)), DEBOUNCE_DELAY),
		[]
	);

	const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
		const { value: currentRequest } = evt.target;
		const hint = hints.length ? hints[0] : '';
		setCurrentHint(hint);
		const isHintRendered =
			hint && hint.length > currentRequest.length && currentRequest.length > request.current.length;
		onChange(isHintRendered ? hint : currentRequest);
		request.current = currentRequest;
		void debounced(currentRequest)();
	};

	const selectHandler = useCallback(
		(arg: string) => {
			request.current = arg;
			onChange(arg);
		},
		[onChange]
	);

	const clickHandler = useCallback(() => {
		request.current = currentHint;
	}, [currentHint]);

	const submitHandler = useCallback((evt: FormEvent) => evt.preventDefault(), []);

	const currentHintHandler = useCallback(
		(hint: string) => {
			setCurrentHint(hint);
			onChange(hint);
		},
		[onChange]
	);

	const isHintListRendered = !!value && !!hints.length;

	return (
		<>
			<InputForm
				value={value}
				onChange={changeHandler}
				onSubmit={submitHandler}
				onClick={clickHandler}
				className={className}
				ref={ref}
			/>
			{isHintListRendered && (
				<HintList
					list={hints}
					dimensions={dimensions.current}
					onSelect={selectHandler}
					setHintText={currentHintHandler}
				/>
			)}
		</>
	);
};
