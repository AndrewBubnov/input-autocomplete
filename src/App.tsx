import { useState } from 'react';
import { Autocomplete } from './components/Autocomplete/Autocomplete.tsx';

function App() {
	const [value, setValue] = useState('');
	return (
		<>
			<Autocomplete value={value} onChange={setValue} />
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum cupiditate repellat sunt. Culpa cumque
				debitis delectus distinctio dolorem libero minima nulla quaerat quibusdam, quo quod suscipit. Aperiam
				consequuntur debitis dolores eius omnis quos, reiciendis similique vel vero. Ab, accusamus accusantium
				adipisci beatae blanditiis commodi consequuntur culpa cum delectus doloremque eaque eius et excepturi
				expedita explicabo harum ipsam iure minima molestias officia perspiciatis praesentium quidem quis
				quisquam quod, quos repellat repellendus, repudiandae rerum sit soluta sunt tenetur ut vel veritatis
				vero voluptatum. Ad aperiam consectetur consequatur dolor doloremque ea eius, impedit in ipsum itaque
				laudantium maxime minima neque nisi odio omnis quae quasi quidem quod ratione reiciendis rem
				repudiandae, tempora? Alias cum, distinctio expedita hic laboriosam odit possimus quos. Ab accusamus
				architecto aspernatur commodi consequatur cum debitis deserunt dolore enim exercitationem facilis fugit,
				illum in ipsam nemo nisi numquam odio quae quasi qui rerum tempora ullam velit voluptatibus voluptatum.
				At atque aut, autem beatae corporis culpa cupiditate dicta distinctio facilis labore maiores nemo non
				numquam obcaecati reiciendis soluta velit? A adipisci amet animi blanditiis, consequuntur cupiditate
				doloribus et exercitationem expedita facere id incidunt, ipsam iure labore magnam nihil pariatur
				perferendis perspiciatis sapiente sint. Aliquid commodi consequatur consequuntur ducimus iure magnam
				temporibus?
			</p>
		</>
	);
}

export default App;
