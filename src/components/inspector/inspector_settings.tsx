import { FC, useState } from "react";
import { RiFileCopyLine, RiSettings2Fill } from "react-icons/ri";
import { useCopyToClipboard } from "react-use";
import { useSnapshot } from "valtio";
import Inspector from ".";
import { ServiceNetworkState } from "../../types";
import Input from "../input";

const themesLight = [
  'customblack',
  'light',
  'lofi',
  'cupcake',
  'corporate',
  'retro',
  'valentine',
  'garden',
  'aqua',
  'pastel',
  'wireframe',
  'winter',
  'cyberpunk',
  // 'bumblebee',
  // 'emerald',
  // 'fantasy',
  // 'cmyk',
  // 'autumn',
  // 'acid',
  // 'lemonade',
]

const themesDark = [
  'dark',
  'synthwave',
  'halloween',
  'forest',
  'black',
  'luxury',
  'dracula',
  'business',
  'night',
  'coffee',
]

const options = [
  { label: 'Light', options: themesLight.map(theme => ({ value: theme, label: theme })) },
  { label: 'Dark', options: themesDark.map(theme => ({ value: theme, label: theme })) }
]

const UI_SCALE_MIN = 0.8;
const UI_SCALE_MAX = 1.5;

const Inspector_Settings: FC = () => {
  const { clientTheme, uiScale } = useSnapshot(window.API.state);
  const handleChangeTheme = (v: string) => window.API.changeTheme(v);
  const handleChangeScale = (v: string | number) => {
    const _v = typeof v === "string" ? parseFloat(v) : v;
    window.API.changeScale(Math.max(UI_SCALE_MIN, Math.min(UI_SCALE_MAX, _v)));
  }

  const [,copy] = useCopyToClipboard();

  const handleCopyLocalClient = () => {
    const {host, port} = window.networkConfiguration;
    copy(`${host}:${port}/client`);
  }
  const handleCopyPubsub = () => {
    const {localIp, port} = window.networkConfiguration;
    copy(`${localIp}:${port}`);
  }

  const [testSwitch, setSwitch] = useState(false);

  return <Inspector.Body>
    <Inspector.Header><RiSettings2Fill /> Settings</Inspector.Header>
    <Inspector.Content>
      <Inspector.SubHeader>UI</Inspector.SubHeader>
      <Input.Select label="Theme" options={options} value={{ value: clientTheme, label: clientTheme }} onChange={(e: any) => handleChangeTheme(e.value)} />
      <Input.Chips label="UI scale" value={uiScale} onChange={e => handleChangeScale(e)} options={[
        { label: "S", value: .8 },
        { label: "M", value: 1 },
        { label: "L", value: 1.2 },
        { label: "X", value: 1.4 },
      ]} />
      <Inspector.SubHeader>Client</Inspector.SubHeader>

      <Input.Container label="Client url">
        <div className="field-width input-group">
          <input disabled value="copy link" className="w-full cursor-text font-medium input input-sm input-bordered" />
          <button className="btn btn-sm text-lg" onClick={handleCopyLocalClient}><RiFileCopyLine/></button>
        </div>
      </Input.Container>
      <Input.Checkbox value={testSwitch} onChange={v => setSwitch(v)} label="Remote share" />
      <Inspector.Switchable visible={testSwitch}>
        <Input.NetworkStatus value={ServiceNetworkState.connected} label="Remote connection" />
        <Input.Container label="Remote url">
          <div className="field-width input-group">
            <input disabled value="copy link" className="w-full cursor-text font-medium input input-sm input-bordered" />
            <button className="btn btn-sm text-lg">
              <RiFileCopyLine/>
            </button>
          </div>
        </Input.Container>
      </Inspector.Switchable>

      <Inspector.SubHeader>Link apps</Inspector.SubHeader>
      <Inspector.Description>Sync text events with remote SimpleSTT instance</Inspector.Description>
      <Input.Text label="Address" placeholder="127.0.0.1:3030" />
      <Input.NetworkStatus value={ServiceNetworkState.connected} label="Connection" />
      <button className="btn btn-sm btn-neutral">Connect</button>
      <button className="btn btn-sm btn-ghost" onClick={handleCopyPubsub}>Copy local address</button>

      {/* <Input.Container label="Link">
        <div className="btn-group">
          <button className="btn btn-sm self-end">Copy</button>
          <button className="btn btn-sm self-end">Copy remote</button>
          <button className="btn btn-sm btn-warning self-end">Refresh</button>
        </div>
      </Input.Container> */}

      <div className="opacity-50">Made with 💗 by Mmp</div>
    </Inspector.Content>
  </Inspector.Body>
}

export default Inspector_Settings;