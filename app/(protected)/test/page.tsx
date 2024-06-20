import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Profile() {
  const supabase = createClientComponentClient();

  // Handle file upload event
  const uploadFile = async (event: any) => {
    const file = event.target.files[0];
    const bucket = "documents";

    // Call Storage API to upload file
    const { data, error } = await supabase.storage
      .from("ava")
      .upload(file.name, file);

    // Handle error if upload failed
    if (error) {
      alert("Error uploading file.");
      return;
    }

    alert("File uploaded successfully!");
  };

  return (
    <div>
      <h1>Upload Profile Photo</h1>
      <input type="file" onChange={uploadFile} />
    </div>
  );
}
