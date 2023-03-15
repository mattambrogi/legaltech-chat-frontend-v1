import axios from 'axios'

console.log('inside generate')

const generateAction = async (req, res) => {
    console.log(`API: ${req.body.userInput}`)
    const data = { "question": req.body.userInput }
    console.log(data)

    const options = {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        data: JSON.stringify(data),
        url: 'https://legaltech-chat.herokuapp.com/ask'
    };

    const response = await axios(options);
    console.log(response.data)

    // Send over the response.
    res.status(200).json({ output: response.data });
};

export default generateAction;