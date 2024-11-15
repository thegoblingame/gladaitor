// in general we keep the player and enemy answers in state with the extensions because we want to be able to easily get the image urls, we trim it whenever we want to display it to the player
export function trimKey(key: string) {
  return key.substring(key.indexOf("/") + 1).replace(/_/g, " ");
}
