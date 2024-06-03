import { useState } from 'react'
import './styles.css'

import lock from './assets/lock.svg'
import unlock from './assets/unlock.svg'

const App = () => {
	const [password, setPassword] = useState('')
	const [characterLength, setCharacterLength] = useState(1)
	const [strength, setStrength] = useState(0)
	const [includesUpper, setIncludesUpper] = useState(false)
	const [includesLower, setIncludesLower] = useState(false)
	const [includesNumber, setIncludesNumber] = useState(false)
	const [includesSymbol, setIncludesSymbol] = useState(false)
	const [error, setError] = useState(false)

	const changeCharacterLength = (event) => {
		setCharacterLength(event.target.value)
	}

	const toggleUpper = () => {
		setIncludesUpper(!includesUpper)
	}

	const toggleLower = () => {
		setIncludesLower(!includesLower)
	}

	const toggleNumber = () => {
		setIncludesNumber(!includesNumber)
	}

	const toggleSymbol = () => {
		setIncludesSymbol(!includesSymbol)
	}

	const generatePassword = () => {
		const allUppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		const allLowers = 'abcdefghijlkmnopqrstuvwxyz'
		const allNumbers = '0123456789'
		const allSymbols = '!@#$&-+=?~|/<>'

		let allChars = ''
		let password = ''

		if (includesUpper) allChars += allUppers
		if (includesLower) allChars += allLowers
		if (includesNumber) allChars += allNumbers
		if (includesSymbol) allChars += allSymbols

		for (let index = 0; index < characterLength; index++) {
			let randomIndex = Math.floor(Math.random() * allChars.length)
			password += allChars[randomIndex]
		}
		calculateStrength()
		if (includesUpper || includesLower || includesNumber || includesSymbol) {
			setPassword(password)
		}
	}

	const calculateStrength = () => {
		if (!includesUpper && !includesLower && !includesNumber && !includesSymbol) {
			setError(true)
			return
		} else {
			setError(false)
		}
		let temp = 0
		if (includesUpper) temp++
		if (includesLower) temp++
		if (includesNumber) temp++
		if (includesSymbol) temp++
		if (characterLength < 8) temp--
		if (characterLength >= 16) temp++
		if (temp == 0) temp = 1
		if (temp >= 5) temp = 4
		setStrength(temp)
	}

	const sliderValue = (characterLength - 1) / (20 - 1)
	const trackStyle = {
		background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${sliderValue * 100}%, var(--background) ${
			sliderValue * 100
		}%, var(--background) 100%)`,
	}
	return (
		<>
			<h1>Password Generator</h1>
			<div className='password-output'>
				<input
					id='pwd'
					type='text'
					placeholder='P@s$W0rd'
					value={password}
				/>
				<button onClick={() => navigator.clipboard.writeText(password)}>
					<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAMhJREFUSEvtlbENwjAQRd+fggIJCVHANixDwwawEIPQ0CGQKNjikJESkQRzF0dpUNLm3z37/P0tRv40cn9cgJltgQOwCS7mAuwknZI+AngCs2DzSnaVtIoC7C2U3MUknZk19G5Ru8DbyR8DhrqlGl12RGb2AObejFv/a7dEAIPcMgE6R5O7H78OuegMMqa4SVo2oqL0xn4BnIF9J+xKAV5G1Vk0AXIJ8DmiO7DoGRW1WyKA9DQegXUQ0nCLCwg27S1zX7TeHVsFLxkArBke8qjRAAAAAElFTkSuQmCC' />
				</button>
			</div>
			<div className='password-inputs'>
				<div className='flex-col'>
					<span>Character length</span>
					<span className='accent-color'>{characterLength}</span>
				</div>
				<div className='slidecontainer'>
					<input
						id='length-slider'
						type='range'
						min='1'
						max='20'
						value={characterLength}
						onChange={changeCharacterLength}
						className='slider'
						style={trackStyle}
					/>
				</div>
				<div className='checkboxes'>
					<div>
						<input
							id='upper'
							type='checkbox'
							onChange={toggleUpper}
							checked={includesUpper}
						/>
						<label htmlFor='upper'>Include Uppercase Letters</label>
					</div>
					<div>
						<input
							id='lower'
							type='checkbox'
							onChange={toggleLower}
							checked={includesLower}
						/>
						<label htmlFor='lower'>Include Lowercase Letters</label>
					</div>
					<div>
						<input
							id='number'
							type='checkbox'
							onChange={toggleNumber}
							checked={includesNumber}
						/>
						<label htmlFor='number'>Include Numbers</label>
					</div>
					<div>
						<input
							id='symbol'
							type='checkbox'
							onChange={toggleSymbol}
							checked={includesSymbol}
						/>
						<label htmlFor='symbol'>Include Symbols</label>
					</div>
				</div>
				<div className='strength flex-col'>
					<span>Strength</span>
					<span className='strength-span'>
						{strength != 0 && (
							<span>
								<span>
									{strength === 1 && 'WEAK'}
									{strength === 2 && 'OKAY'}
									{strength === 3 && 'MEDIUM'}
									{strength === 4 && 'STRONG'}
								</span>
							</span>
						)}
						<img src={strength >= 1 ? lock : unlock} />
						<img src={strength >= 2 ? lock : unlock} />
						<img src={strength >= 3 ? lock : unlock} />
						<img src={strength >= 4 ? lock : unlock} />
					</span>
				</div>
				<button
					onClick={generatePassword}
					className='generate-button'
				>
					Generate &rarr;
				</button>
			</div>
			<div className='error'>{error && 'Please select something'}</div>
		</>
	)
}

export default App
