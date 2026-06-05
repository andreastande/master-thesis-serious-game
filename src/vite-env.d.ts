/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Dev-only: when "true", unlock every case in the Sakshub regardless of progress. */
  readonly VITE_UNLOCK_ALL_CASES?: string
}
