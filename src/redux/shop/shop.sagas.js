import  { takeLatest, call, put, all } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import {  fetchCollectionSuccess, fetchCollectionsFailure } from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
    yield console.log('I am fired');

    try{
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    yield put(fetchCollectionSuccess(collectionsMap));
    } catch (error) {
      yield put(fetchCollectionsFailure(error.message));
    }

//PROMISE STYLE OF ABOVE CODE
    // collectionRef
    // .get()
    // .then(snapshot => {
    //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //     dispatch(fetchCollectionSuccess(collectionsMap));
    //   }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
  }


export function* fetchCollectionsStart() {
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync 
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}