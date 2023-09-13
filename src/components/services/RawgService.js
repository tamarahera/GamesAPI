class RawgService {

    _key = process.env.REACT_APP_API_KEY;
    _path = 'https://api.rawg.io/api/games';

    getResource = async (url) => {
        let result = await fetch(url);

        if (!result.ok) {
            throw new Error('Error')
        }

        return await result.json();
    }

    getAllGames = async (url = `${this._path}?page_size=9&key=${this._key}`) => {
        const res = await this.getResource(url);

        const arr = res.results.map(item => {
            return this._transforData(item);
        });
        const nextPageUrl = res.next;

        return {arr, nextPageUrl};
    }

    getGameById = async (id) => {
        const res = await this.getResource(`${this._path}/${id}?key=${this._key}`);
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