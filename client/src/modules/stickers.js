import CloudSticker from '../icons/cloudSticker.png';
import Ghost1 from '../icons/ghost1.png';
import Glitter from '../icons/glitter.png';
import Cheese from '../icons/cheeseicon2.png';

const CURRENT_STICKERS = 'stickers/CURRENT_STICKERS';
const ADD_STICKER = 'stickers/ADD_STICKER';
const TOGGLE_STICKER = 'stickers/TOGGLE_STICKER';
const DELETE_STICKER = 'stickers/DELETE_STICKER';
const EDIT_STICKER = 'stickers/EDIT_STICKER';


export const currentStickers = (stickers) => ({
    type: CURRENT_STICKERS,
    stickers
});

export const editSticker = (name, x, y) => ({
    type: EDIT_STICKER,
    x,
    y
}) 

const initialState = [{name: 'cloud', x: 140, y: 580, show: true, imgSrc: CloudSticker, croppedAreaPixels: {width: 500, height: 500, x: 0, y: 0}, rotation: 0},
    {name: 'ghost', x: 300, y: 330, show: true, imgSrc: Ghost1, croppedAreaPixels: {width: 455, height: 455, x: 22, y: 14}, rotation: 0},
    {name: 'glitter', x: 360, y: 200, show: true, imgSrc: Glitter, croppedAreaPixels: {width: 333, height: 333, x: 74, y: 95}, rotation: 0},
    {name: 'cheese', x: 580, y: 410, show: true, imgSrc: Cheese, croppedAreaPixels: {width: 130, height: 130, x: 0, y: 0}, rotation: 0},
];

export default function stickers( state = initialState, action) {
    switch (action.type) {
        case CURRENT_STICKERS:
            return action.stickers;
        case EDIT_STICKER:
            return state.map(
                sticker =>
                    sticker.name === action.name
                    ? {... sticker, x: action.x, y: action.y}
                    : sticker
            );
        default:
            return state;
    }
}