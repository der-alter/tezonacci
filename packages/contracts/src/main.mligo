#import "tezos-ligo-fa2/lib/fa2/asset/single_asset.mligo" "SingleAsset"

type parameter = unit
type storage = unit
type result = operation list * storage

let main (_action, store : parameter * storage) : result =
    ([] : operation list), store
