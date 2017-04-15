/**
 * Created by ulicny on 15.04.2017.
 */

import {schema} from 'normalizr';

export const todo = new schema.Entity('todos');
export const arrayOfTodos = new schema.Array(todo);

