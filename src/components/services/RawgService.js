import parse from 'html-react-parser'; // use to parse string into html

class RawgService {

    _key = process.env.REACT_APP_API_KEY;

    getResource = async (url) => {
        console.log(process.env.REACT_APP_API_KEY)
        let result = await fetch(url);

        if (!result.ok) {
            throw new Error('Error')
        }

        return await result.json();
    }

    getAllGames = async () => {
        const res = await this.getResource(`https://api.rawg.io/api/games?page_size=9&key=${this._key}`);
        const arr = res.results.map(item => {
            return this._transforData(item);
        })
        return arr;
    }

    getGameById = async (id) => {
        const res = await this.getResource(`https://api.rawg.io/api/games/${id}?key=${this._key}`);

        return this._transforData(res);
    }

    _transforData = ({name, description, developers, id, background_image, genres, rating, released, reddit_url, platforms, website}) => {
        let dataPlatforms = platforms.map(item => {
            return item.platform.name;
        });

        return {
            name: name,
            description: description ? description : 'No description for this game',
            developer: developers ? developers[0].name : null,
            id: id,
            img: background_image,
            genres: genres.map(item => item.name).join(', '),
            rating: rating,
            released: released,
            platforms: dataPlatforms,
            news: reddit_url ? reddit_url : null,
            homepage: website ? website : null
        }
    }
}

export default RawgService;