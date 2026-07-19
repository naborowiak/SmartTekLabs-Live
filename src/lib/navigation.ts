/**
 * App-wide navigation contract. The app uses a lightweight state router
 * (no react-router), so page identity and the navigate function are shared here.
 *
 * `arg` is overloaded by page:
 *  - home:        optional section id to scroll to
 *  - case-study:  the study slug to open
 */
export type PageName = "home" | "events" | "case-study";

export type SetPage = (page: PageName, arg?: string) => void;
