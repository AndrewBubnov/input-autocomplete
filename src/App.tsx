import Input from './components/Input/Input.tsx';
import { useState } from 'react';

function App() {
	const [value, setValue] = useState('');
	return <Input value={value} onChange={setValue} />;
}

export default App;
