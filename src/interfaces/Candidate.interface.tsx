// TODO: Create an interface for the Candidate objects returned by the API

export interface Candidate {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    name?: string;
    email?: string;
    location?: string;
    company?: string;
}