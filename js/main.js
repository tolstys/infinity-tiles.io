let game;
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
$(function() {
    /*
    for (var i = 0; i < TILES.length; i ++) {
        let $tiles = $('<span class="tiles-stack"></span>');
        let r = getRandomInt(1, 5);
        for (var j = 0; j < r; j ++) {
            let tile = TILES[i];
            $tiles.append(tile.getHtml());
        }
        $(".block-tiles").append($tiles);
    }
    */
    /*
    game = new Game({
        count_tiles_types: 8,
        //count_stacks: 23,
        count_tiles: 120,
        layersSize: [
            [3, 2],
            [4, 3],
            [5, 4],
            [4, 3],
            [5, 4],
            [4, 3],
            [5, 4],
            [4, 3],
            [3, 2]
        ]
    });
    */
    /*
    game = new Game({
        count_tiles_types: 6,
        //count_tiles: 84,
        layersData: [
            {size: [3, 3]},
            {size: [3, 3]},
            {size: [3, 3]},
            {size: [4, 3]},
            {size: [3, 4]},
            {size: [4, 3]},
            {size: [3, 3]},
            {size: [3, 4]},
            {size: [2, 3]},
            {size: [1, 3]}
        ]
    });
    */
    /*
    game = new Game({
        count_tiles_types: 6,
        layersData: [
            {map: [[1,1,1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1]]},
            {map: [[1,1,1,1,0,1,1,1,1],[0,0,0,0,0,0,0,0,0],[1,1,1,1,0,1,1,1,1]]},
            {map: [[1,1,1,0,0,1,1,1],[0,0,0,0,0,0,0,0],[1,1,1,0,0,1,1,1]]},
            {map: [[1,1,0,0,0,1,1],[0,0,0,0,0,0,0],[1,1,0,0,0,1,1]]},
            {map: [[1,0,0,0,0,1],[0,0,0,0,0,0],[1,0,0,0,0,1]]}
        ]
    });
    */
    /*
    let width = 3, height = 4, layersData = [],
        limits = [2, 5],
        w1 = 3,
        h1 = 3;
    for (let l = 0; l < 3; l ++) {
        w1 = w1 + getRandomInt(-1, 1);
        h1 = h1 + getRandomInt(-1, 1);
        if (w1 < limits[0]) w1 = limits[0];
        if (h1 < limits[0]) h1 = limits[0];
        if (w1 > limits[1]) w1 = limits[1];
        if (h1 > limits[1]) h1 = limits[1];
        let layerData = {map: []};
        for (let i = 0; i < w1; i ++) {
            layerData.map[i] = [];
            for (let j = 0; j < h1; j ++) {
                layerData.map[i][j] = Math.random() < 0.9 ? 1 : 0;
            }
        }
        layersData.push(layerData);
    }
    console.log(layersData);
    game = new Game({
        count_tiles_types: 4,
        layersData: layersData
    });
    */
    /*
    game = new Game({
        count_tiles_types: 7,
        tiles_unique: [
            ...Array(3).fill(TILES_UNIQUE[0]),
            ...Array(2).fill(TILES_UNIQUE[1]),
            ...Array(1).fill(TILES_UNIQUE[2])
        ],
        layersData: [
            {size: [3, 3]},
            {size: [3, 3]},
            {size: [4, 3]},
            {size: [3, 4]},
            {size: [4, 3]},
            {size: [3, 3]},
            {size: [3, 4]},
            {size: [2, 3]},
            {size: [1, 3]}
        ]
    });
    game.create();
    */
    TILES = shuffle(TILES);
    let count_tile_types = 6;
    game = new Game();
    game.addLayer(new Layer({
        count_tile_types: count_tile_types,
        size: [3, 1]
    }));
    game.addLayer(new Layer({
        count_tile_types: count_tile_types,
        size: [3, 2]
    }));
    game.addLayer(new Layer({
        count_tile_types: count_tile_types,
        size: [4, 3]
    }));
    ++ count_tile_types;
    game.addLayer(new Layer({
        count_tile_types: count_tile_types,
        size: [3, 4]
    }));
    game.addLayer(new Layer({
        count_tile_types: count_tile_types,
        size: [4, 3]
    }));
    ++ count_tile_types;
    game.addLayer(new Layer({
        count_tile_types: count_tile_types,
        size: [5, 4]
    }));
    /*
    for (let i = 0; i < 10; i ++) {
        game.addLayer(new Layer({
            count_tile_types: count_tile_types,
            size: [1, 3]
        }));
    }
    */
    $(".block-tiles").html(game.getHtml());
});

function getRandomInt(min = 0, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function shuffle(array) {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => b.sort - a.sort)
        .map(({ value }) => value);
}