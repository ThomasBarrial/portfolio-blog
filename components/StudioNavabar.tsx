
import Link from "next/link"
import { ArrowUturnLeftIcon} from "@heroicons/react/24/solid"


function StudioNavabar(props: any) {
  return (
    <div>
          <div>
              <div className="flex items-center justify-between p-5">
                  <Link href="/" className="text-[#b021fd] flex items-center">
                      <ArrowUturnLeftIcon className="h-6 w-6 text-[#b021fd] mr-2"/>
                        Go to the website
                  </Link>
              </div>
              {props.renderDefault(props)}
          </div>
    </div>
  )
}

export default StudioNavabar
