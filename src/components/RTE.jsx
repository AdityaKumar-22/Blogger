import { Controller } from "react-hook-form"
import { Editor } from "@tinymce/tinymce-react"
import conf from "../conf/conf"
export default function RTE({name,control,label,defaultValue=''}){
    return (
        <div className="w-full">
            {label && <label className="inline-block mb-1 pl-1">{label}</label>}
            <Controller name={name} control={control}
            render={({field:{onChange}})=>(
                <Editor initialValue={defaultValue}
                apiKey={conf.tinymceApiKey}
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount"
                    ],
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
                    content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                }} onEditorChange={onChange} />
            )} />
        </div>
    )
}