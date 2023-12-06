const resultEl = document.getElementById("result") as HTMLSpanElement
const generateEl = document.getElementById("generate") as HTMLButtonElement
const copyEl = document.getElementById("copy") as HTMLButtonElement
const displayLengthEl = document.getElementById(
	"displayLength"
) as HTMLDivElement
const lengthEl = document.getElementById("length") as HTMLInputElement
const uppercaseEl = document.getElementById("uppercase") as HTMLInputElement
const lowercaseEl = document.getElementById("lowercase") as HTMLInputElement
const numbersEl = document.getElementById("numbers") as HTMLInputElement
const symbolsEl = document.getElementById("symbols") as HTMLInputElement
const recYearEl = document.getElementById("recYear") as HTMLSpanElement

lengthEl.addEventListener("input", (e: any) => {
	const value: string = e.target.value
	displayLengthEl.setAttribute("data-length", value)
})

function getRandomLower(): string {
	return String.fromCharCode(Math.floor(Math.random() * 26 + 97))
}
function getRandomUpper(): string {
	return String.fromCharCode(Math.floor(Math.random() * 26 + 65))
}
function getRandomNumber(): number {
	return Math.floor(Math.random() * 10)
}
function getRandomSymbol(): string {
	const symbols = "!@#$%^&*(){}[]=<>/,."
	return symbols[Math.floor(Math.random() * symbols.length)]
}

type allFunc = {
	lower: () => string
	upper: () => string
	number: () => number
	symbol: () => string
}

const randomFunc: allFunc | any = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol,
}

generateEl.addEventListener("click", () => {
	const length: number = +lengthEl.value
	const hasLower: boolean = lowercaseEl.checked
	const hasUpper: boolean = uppercaseEl.checked
	const hasNumber: boolean = numbersEl.checked
	const hasSymbol: boolean = symbolsEl.checked

	resultEl.innerText = generatePassword(
		hasLower,
		hasUpper,
		hasNumber,
		hasSymbol,
		length
	)
})

copyEl.addEventListener("click", () => {
	const password: string = resultEl.innerText
	const textarea = document.createElement("textarea") as HTMLTextAreaElement
	if (password === "Your Password!") {
		alert("You didn't generate the password!")
	} else {
		textarea.value = password
		document.body.appendChild(textarea)
		textarea.select()
		document.execCommand("copy")
		textarea.remove()
	}

	resultEl.innerText = "Your Password!"
})

function generatePassword(
	lower: boolean,
	upper: boolean,
	number: boolean,
	symbol: boolean,
	length: number
): string {
	let generatedPassword: string = ""
	const typesCount: number =
		Number(lower) + Number(upper) + Number(number) + Number(symbol)

	const typesArr = [{ lower }, { upper }, { number }, { symbol }]
	const filteredArr = typesArr.filter(func => {
		return Object.values(func)[0]
	})

	if (typesCount == 0) {
		return ""
	}

	for (let i = 0; i < length; i += typesCount) {
		filteredArr.forEach(type => {
			const funcName: string = Object.keys(type)[0]
			generatedPassword += randomFunc[funcName]()
		})
	}

	const finalPassword: string = generatedPassword.slice(0, length)
	return finalPassword
}

let year: number = new Date().getFullYear()
recYearEl.innerHTML = year.toString()
