import { Auth } from "../components/Auth"
import { Aura2 } from "../components/Aura2"

export const Signin = () => {
    return <div> 
    <div className="grid grid-cols-2">
        <div>
            <Auth type = "signin"/>
        </div>

        <div className="none lg:block">
          <Aura2/>
        </div>
     </div>
    </div>
}