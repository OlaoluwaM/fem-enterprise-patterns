import { Component, OnInit } from '@angular/core';

type NullishString = string | null;
interface BaseEntry {
  id: NullishString;
}

interface Client extends BaseEntry {
  firstName: string;
  lastName: string;
  company: string;
}

const peter: Client = {
  id: '1',
  firstName: 'Peter',
  lastName: 'Porker',
  company: 'Acme, Inc',
};

const john: Client = {
  id: '2',
  firstName: 'John',
  lastName: 'Doe',
  company: 'NA',
};

const newClient: Client = {
  id: null,
  firstName: '',
  lastName: '',
  company: '',
};

interface ClientState {
  clients: Client[];
  currentClient: Client;
}

const clients: Client[] = [peter, john];

const initialClientState: ClientState = {
  clients,
  currentClient: newClient,
};

interface Project extends BaseEntry {
  title: NullishString;
  description: NullishString;
}

interface ProjectState {
  projects: Project[];
  currentProject: Project;
}

const houseMaking: Project = {
  id: '11',
  title: "Building the chairman's house",
  description: 'lollllllllllllllllllllllllllllllllllllllllllllllllllllllll',
};

const fashionCampaign: Project = {
  id: '22',
  title: 'Fashion line reveal',
  description: 'HODLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL',
};

const newProjectTemplate: Project = {
  id: null,
  title: null,
  description: null,
};

const initialProjectState: ProjectState = {
  projects: [fashionCampaign, houseMaking],
  currentProject: newProjectTemplate,
};

class ClientStore {
  state: ClientState;

  constructor(state: ClientState) {
    this.state = state;
  }

  get getState() {
    return this.state;
  }

  selectStateMember(key: keyof ClientState) {
    return this.state[key];
  }
}
class ProjectStore {
  state: ProjectState;

  constructor(state: ProjectState) {
    this.state = state;
  }

  get getState() {
    return this.state;
  }

  selectStateMember(key: keyof ProjectState) {
    return this.state[key];
  }
}

const clientStore = new ClientStore(initialClientState);
const currentClient = clientStore.selectStateMember('currentClient');

const projectStore = new ProjectStore(initialProjectState);
const currentProject = projectStore.selectStateMember('currentProject');

enum ClientActions {
  LOAD = '[Client] Load',
  CREATE = '[Client] Create',
  UPDATE = '[Client] Update',
  DELETE = '[Client] Delete',
  SELECT = '[Client] Select',
  CLEAR = '[Client] Clear',
}

interface Action {
  type: ClientActions;
  payload?: { metaData: string };
}

function loadClient(currentState: ClientState): ClientState {
  return currentState;
}

function createClient(
  currentState: ClientState,
  clientMetaData: Action['payload']
): ClientState {
  return { ...currentState, ...clientMetaData };
}

function reducer(
  currentState: ClientState = initialClientState,
  action: Action
): ClientState {
  switch (action.type) {
    case ClientActions.LOAD:
      return loadClient(currentState);

    case ClientActions.CREATE:
      return createClient(currentState, action.payload);

    default:
      return currentState;
  }
}

@Component({
  selector: 'fem-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  echo = clientStore;
}
