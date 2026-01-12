import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"

export const PassHide = (props: { bool: boolean, setBool: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { bool, setBool } = props

    return bool
        ? <EyeIcon className="flex-none size-5 text-emerald-700" onClick={() => setBool(!bool)} />
        : <EyeSlashIcon className="flex-none size-5 text-emerald-700" onClick={() => setBool(!bool)} />

}
