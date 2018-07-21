let default =
  ReasonReact.wrapReasonForJs(~component=App.component, _jsProps =>
    App.make()
  );