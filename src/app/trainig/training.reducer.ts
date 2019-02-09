import { TrainingActions, SET_AVAILABLE_TRAINING, SET_FINISHED_TRAINIG, SET_START_TRAINIG, SET_STOP_TRAINIG } from "./training.action";
import { Exercise } from "./exercise.model";
import * as fromRoot from '../app.reducer';
import { createFeatureSelector, createSelector } from "@ngrx/store";
export interface TrainingState {
	availableExercises: Exercise[];
	finishedExercises: Exercise[];
	activeTraining: Exercise;
}

export interface State extends fromRoot.State {
	trainig: TrainingState;
}
const initialState: TrainingState = {
	finishedExercises: [],
	availableExercises: [],
	activeTraining: null
}

export function trainingReducer(state = initialState, action: TrainingActions) {
	switch (action.type) {
		case SET_AVAILABLE_TRAINING:
			return {
				...state,
				availableExercises: action.payload
			};
		case SET_FINISHED_TRAINIG:
			return {
				...state,
				finishedExercises: action.payload
			};
		case SET_START_TRAINIG:
			return {
				...state,
				activeTraining: { ...state.availableExercises.find(ex => ex.id === action.payload) }
			};
		case SET_STOP_TRAINIG:
			return {
				...state,
				activeTraining: null
			};
		default: {
			return state;
		}
	}

}
export const getTrainingState = createFeatureSelector<TrainingState>('training');
export const getAvailableTraining = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedTraining = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);

