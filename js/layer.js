class Layer {
    constructor (data = {}) {
        this.index = game.layers.length;
        this.count_tile_types = data.count_tile_types;
        this.width = data.size[0];
        this.height = data.size[1];
        this.tiles = [];
        //this.map = data.map;
        for (let i = 0; i < this.width; i ++) {
            this.tiles[i] = [];
            for (let j = 0; j < this.height; j ++) {
                //if (data.map[j][i] === 0) continue;
                //if (data.tiles.length === 0) break;
                let tile;
                if (Math.random() < 0.05) {
                    tile = TILES_UNIQUE[getRandomInt(0, TILES_UNIQUE.length - 1)].copy();
                } else {
                    tile = TILES[getRandomInt(0, this.count_tile_types - 1)].copy();
                }
                this.addTile(tile, i, j);
            }
        }
    }

    getTilesCount () {
        let count = 0;
        for (let i = 0; i < this.width; i ++) {
            for (let j = 0; j < this.height; j ++) {
                if (this.tiles[i][j] !== undefined && this.tiles[i][j] !== null) {
                    ++ count;
                }
            }
        }
        return count;
    }

    remove () {
        game.layers.shift();
        game.layers.map(layer => -- layer.index);
    }

    addTile (tile, i, j) {
        tile.layer = this;
        tile.w = i;
        tile.h = j;
        this.tiles[i][j] = tile;
    }

    getWidth () {
        return this.width;
    }

    getHeight () {
        return this.height;
    }

    getTiles () {
        return this.tiles;
    }
    /*
    removeTile (w, h) {
        this.tiles[w][h] = null;
    }
    */
    getHtml () {
        let $layerBlock = $('<div class="game-layer"></div>');
        $layerBlock.css({
            width: CONFIG.TILE_WIDTH * this.getWidth(),
            height: CONFIG.TILE_HEIGHT * this.getHeight()
        });
        /*
        for (let i = 0; i < this.width; i ++) {
            for (let j = 0; j < this.height; j ++) {
                if (this.tiles[i][j] === undefined || this.tiles[i][j] === null) continue;
                let $tileBlock = $(this.tiles[i][j].getHtml()).attr("data-w", i).attr("data-h", j);
                $tileBlock.css({
                    left: CONFIG.TILE_WIDTH * i,
                    top: CONFIG.TILE_HEIGHT * j,
                    zIndex: `${j + 1}${this.width - i}`
                });
                $layerBlock.append($tileBlock);
            }
        }
        */
        for (let i = 0; i < this.width; i ++) {
            for (let j = 0; j < this.height; j ++) {
                if (this.tiles[i][j] === undefined || this.tiles[i][j] === null) continue;
                /*
                let $tileBlock = $(this.tiles[i][j].getHtml()).attr("data-w", i).attr("data-h", j);
                $tileBlock.css({
                    left: CONFIG.TILE_WIDTH * i,
                    top: CONFIG.TILE_HEIGHT * j,
                    zIndex: `${j + 1}${this.width - i}`
                });
                $layerBlock.append($tileBlock);
                */
                this.tiles[i][j].updateElem(
                    this.tiles[i][j].getElem()
                        .attr("data-w", i)
                        .attr("data-h", j)
                        .css({
                            left: CONFIG.TILE_WIDTH * i,
                            top: CONFIG.TILE_HEIGHT * j,
                            zIndex: `${j + 1}${this.width - i}`
                        })
                );
                $layerBlock.append(this.tiles[i][j].getElem());
            }
        }
        return $layerBlock;
    }
}