

export interface Profile {
  firstName?: string;
  lastName?: string;
  email?: string;
}
export interface DevItem {
  // Non-empty in API request and response
  id?: string;

  // Non-empty in API response
  versionstamp?: string;
  profile: Profile | null;
}