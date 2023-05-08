import { STORE_MODULE } from '@/constants'
import { Module } from 'vuex'

export interface IStoreBaseModule<S> extends Omit<Module<S, unknown>, 'modules'> {
    namespaced: true
}

export interface IStoreModule<S> {
    name: STORE_MODULE
    module: IStoreBaseModule<S>
}
