[@bs.module "react"]
external createContext : 'a => Js.Dict.t(ReasonReact.reactClass) = "";

module type Config = {type t; let value: t;};

module Make = (C: Config) => {
  let context = createContext(C.value);

  module Provider = {
    let reactClass = Js.Dict.unsafeGet(context, "Provider");
    let make = (~value: C.t, children) =>
      ReasonReact.wrapJsForReason(
        ~reactClass,
        ~props={"value": value},
        children,
      );
  };

  module Consumer = {
    let reactClass = Js.Dict.unsafeGet(context, "Consumer");
    let make = (children: C.t => 'a) =>
      ReasonReact.wrapJsForReason(
        ~reactClass,
        ~props=Js.Obj.empty(),
        children,
      );
  };
};