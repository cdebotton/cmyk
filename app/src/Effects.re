[@bs.deriving abstract]
type t = {token: option(string)};

external storageToAbstract : Js.Json.t => t = "%identity";

let tokenNameSpace = "cmyk-token";

let getTokenValueFromStorage = () => {
  let maybeValueFromStorage =
    Dom.Storage.(localStorage |> getItem(tokenNameSpace));

  switch (maybeValueFromStorage) {
  | None => None
  | Some(value) => value |> Js.Json.parseExn |> storageToAbstract |> token
  };
};