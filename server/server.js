import express from 'express';

const app = express();

app.get('/api/products', (req, res) => {
    res.send()
})

const port = process.env.PORT || 7000;

app.listen(port, () => {
    console.log(`server at http://localhost:${port}`)
});