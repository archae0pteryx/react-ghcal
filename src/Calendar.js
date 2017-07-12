import React from 'react'
import cheerio from 'cheerio'
import axios from 'axios'

const baseURL = 'https://github.com/archae0pteryx'

const opts = {
    headers: {
		"Authorization": 'token 3b5bc180d175e8c76622681daee9944e450eb327',
		'X-Requested-With': 'XMLHttpRequest',
		'Access-Control-Allow-Origin': '*',
		// 'Access-Control-Allow-Methods': 'GET',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
		'Content-Type': 'application/json'
	}
};
function getSVG(user) {
    return new Promise((resolve, reject) => {
        const url = baseURL + user
        axios.get(url, opts).then(res => {
            const load = cheerio.load(res.data)
            const parsed = load('.js-calendar-graph').html()
            const svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 720 120"> ' + parsed + ' </svg>';
            // fs.writeFile('./scrapedSVG.svg', svg, function(err) {
            //     console.log('File successfully written!')
            // })
            resolve(svg)
        }).catch(err => reject(err))
    })
}

export default class extends React.Component {
	constructor() {
		super()
		this.state = {
			svg: ''
		}
	}
	componentWillMount() {
		getSVG('archae0pteryx').then(svg => {
			console.log("SVG ", svg)
			this.setState({svg: svg})
		})
	}
	render() {
		const {svg} = this.state
		return (
			<div>
				<img src={svg} alt="github contrib cal"/>
			</div>
		)
	}
}
