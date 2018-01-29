import { Router } from 'express';

import { buy } from './buy';
import { get } from './get';
import { save } from './save';

export const router = Router();

router.get('/get-pokemons', get);
router.put('/create-pokemons', save);
router.put('/save-pokemons', save);
router.post('/buy-pokemons', buy);
