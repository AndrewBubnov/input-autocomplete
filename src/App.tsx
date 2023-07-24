import { useState } from 'react';
import { Autocomplete } from './components/Autocomplete/Autocomplete.tsx';
import { getMockHints } from './utils/getMockHints.ts';

function App() {
	const [value, setValue] = useState('');
	return (
		<>
			<Autocomplete value={value} onChange={setValue} fetchFn={getMockHints} onSubmit={console.log} />

			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid at atque autem cum cumque, debitis
				deleniti dignissimos dolores eligendi ex excepturi expedita fuga harum illum ipsa iste magnam magni
				maxime modi molestias neque nesciunt nulla odio officia porro provident qui quibusdam quos rem repellat
				reprehenderit rerum sapiente sit tempore ut, vitae voluptatum! A accusantium, ad aspernatur assumenda
				atque commodi cum debitis delectus dolores, ducimus ea eaque eligendi excepturi exercitationem fuga
				impedit incidunt inventore iste laboriosam modi molestias nam necessitatibus neque odit omnis
				praesentium, quam quidem quis quo repellendus reprehenderit sapiente sed tempora vel velit vitae
				voluptas. Ab blanditiis, cum iure quaerat qui quis sint ullam. Ab blanditiis et eveniet ipsa iste
				sapiente! Aliquid architecto assumenda atque debitis, deleniti dolore dolores excepturi ipsa iste
				laudantium magnam molestias mollitia necessitatibus officiis optio provident quam quo quod rem, sed sint
				ullam ut. Ab accusamus adipisci aliquam aliquid aperiam asperiores blanditiis commodi consequatur cumque
				cupiditate deleniti dignissimos ea, est excepturi facilis fuga fugiat fugit illum in incidunt ipsam
				libero minima minus mollitia natus nostrum perspiciatis possimus praesentium quam quisquam rem
				repellendus sequi, sunt tempora vel velit voluptatibus? Autem blanditiis consectetur corporis cumque
				deserunt dignissimos dolorem eius enim error esse, explicabo fuga harum illo illum impedit incidunt,
				inventore, ipsum laboriosam minima modi molestiae necessitatibus neque nisi optio quibusdam sed suscipit
				tempore temporibus tenetur totam ullam unde voluptates voluptatum? Alias animi, asperiores autem
				cupiditate delectus eveniet explicabo illo ipsa iusto minus nam neque officia officiis, omnis
				perferendis, placeat quisquam recusandae reiciendis repellat reprehenderit sed soluta temporibus tenetur
				ut vel vero voluptas. Distinctio doloremque labore placeat quidem! Aspernatur blanditiis impedit iusto
				suscipit voluptates? Autem cupiditate doloribus, enim fugiat in ipsam maxime minima nemo quis. A
				consectetur deleniti eaque eligendi expedita fugiat impedit iste, laudantium molestias neque nobis non
				possimus quas quidem recusandae reiciendis repellendus similique voluptate! Animi eius ex harum impedit
				minus nisi non saepe sapiente! Aliquam corporis dolor error et fugiat nisi nobis sit. Alias cupiditate
				doloremque eum nulla optio perferendis voluptatum? Aliquam asperiores et iste, iure natus perspiciatis
				sit sunt tempora voluptatem. Animi atque deserunt eaque est, fuga hic possimus quo similique tenetur. A
				aut cumque excepturi nesciunt perferendis quasi recusandae, ut? Ab alias aliquam aspernatur aut autem
				cum debitis deserunt dolore dolorum explicabo facilis fugiat harum illum inventore ipsum magnam magni
				maxime nesciunt non officia pariatur porro praesentium quae quam quisquam repellendus sed similique,
				tempore voluptates voluptatibus. Aliquid amet autem blanditiis corporis debitis dolor, dolores
				exercitationem, explicabo facere harum illum laudantium minus modi molestiae natus perferendis possimus
				quaerat quas qui quidem quisquam reprehenderit rerum sapiente sit ullam velit veritatis voluptas
				voluptate voluptatem voluptatibus. A ad aperiam asperiores assumenda at commodi cumque debitis eius enim
				error exercitationem incidunt inventore laudantium modi nobis nulla, obcaecati odio omnis quam quia
				quibusdam quo recusandae sequi tempora vel? Ab accusantium amet commodi consequatur deleniti distinctio
				dolore error eum ex exercitationem illo impedit laboriosam minus modi nam nihil nisi odio odit officia
				possimus qui quisquam quod ratione repellendus reprehenderit saepe sapiente sed tempore tenetur vero,
				voluptate voluptatem voluptates voluptatum. Amet debitis dolore explicabo necessitatibus odio quisquam
				recusandae totam voluptatum. A accusamus, adipisci alias consectetur cupiditate dicta eaque eligendi
				facere iste labore molestias natus nesciunt nostrum officiis quisquam! Eligendi itaque iusto officia
				perferendis. Ab aliquid animi aut commodi consequuntur, cum cumque deserunt dignissimos dolores
				doloribus eius facilis fugit id in ipsum laboriosam laborum maiores mollitia nam necessitatibus non odio
				provident sequi sunt veniam voluptatem voluptates voluptatum? Adipisci, atque consequatur corporis
				dolores facere laborum minus necessitatibus, perferendis perspiciatis porro repellat reprehenderit ut.
				Ab aliquid cupiditate, eius et facilis illum iste laboriosam laborum modi sapiente temporibus vero! A
				aut delectus eaque eveniet facilis, hic illo impedit mollitia neque non odio perferendis quia suscipit
				unde velit vitae voluptatum. Dicta, esse itaque labore nihil odit perferendis sunt? Aperiam architecto
				consequatur, corporis culpa cum cupiditate, deserunt dicta dignissimos ea, eligendi enim eveniet
				excepturi impedit iure magni soluta tempore veniam vero! Animi blanditiis cupiditate dignissimos,
				dolorum ea eaque est facilis fugit in iure magnam minima modi molestiae natus omnis pariatur, possimus
				quas quidem repudiandae temporibus tenetur ullam unde. Accusantium ad consectetur eaque officiis sunt
				ullam. Ab amet dolor eaque facilis mollitia neque nisi provident quod rerum suscipit. Cupiditate ea fuga
				nam recusandae. Aut dolorum eos esse iure?
			</p>
		</>
	);
}

export default App;
