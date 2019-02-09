import { Action } from "@ngrx/store";
import { Exercise } from "./exercise.model";

export const SET_AVAILABLE_TRAINING = '[Training] set available training';
export const SET_FINISHED_TRAINIG = '[Training] set finished training ';
export const SET_START_TRAINIG = '[Training] set start training ';
export const SET_STOP_TRAINIG = '[Training] set stop training';


export class setAvailableTraining implements Action {
	readonly type = SET_AVAILABLE_TRAINING;
	constructor(public payload: Exercise[]) { }
}

export class SetFinishedTraining implements Action {
	readonly type = SET_FINISHED_TRAINIG;
	constructor(public payload: Exercise[]) { }

}

export class SetStartTraining implements Action {
	readonly type = SET_START_TRAINIG;
	constructor(public payload: string) { }

}

export class SetStopTraining implements Action {
	readonly type = SET_STOP_TRAINIG;

}

export type TrainingActions = setAvailableTraining | SetFinishedTraining | SetStopTraining | SetStartTraining;