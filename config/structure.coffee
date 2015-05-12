# Read more about app structure at http://docs.appgyver.com

module.exports =

  # See styling options for tabs and other native components in app/common/native-styles/ios.css or app/common/native-styles/android.css
  tabs: [
    {
      title: "My Account"
      id: "account"
      location: "Account#login" # Supersonic module#view type navigation
    }
  ]

  # rootView:
  #   location: "home#index"

  preloads: [
    {
      id: "index"
      location: "home#index"
    }
  ]

  # drawers:
  #   left:
  #     id: "leftDrawer"
  #     location: "example#drawer"
  #     showOnAppLoad: false
  #   options:
  #     animation: "swingingDoor"
  #
  # initialView:
  #   id: "index"
  #   location: "home#index"
