import React from 'react'
import cheerio from 'cheerio'
import axios from 'axios'
import {Spinner} from './Spinner'
const baseURL = 'https://crossorigin.me/https://github.com/'

function getSVG(user) {
    return new Promise((resolve, reject) => {
        const url = baseURL + user
		axios.get(url).then(res => {
			const load = cheerio.load(res.data)
			const parsed = load(".js-calendar-graph").html()
			const svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 720 120"> ' + parsed + ' </svg>';
			resolve(svg)
		}).catch(err => reject(err));
    })
}

export default class extends React.Component {
	constructor() {
		super()
		this.state = {
			svg: '',
			loading: true
		};
	}
	componentWillMount() {
		getSVG('archae0pteryx').then(svg => {
			// console.log("SVG ", svg)
			this.setState({ svg: svg, loading: false });
		});
	}
	render() {
		const { svg, loading } = this.state;
		return (
			<div>
				{loading ?
					<Spinner/>
					: 
					<span dangerouslySetInnerHTML={{__html: svg}} />
				}
			</div>
		)
	}
}
