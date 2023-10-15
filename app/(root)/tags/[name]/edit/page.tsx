import CreateEditTagForm from "@/components/forms/CreateEditTagForm";

interface EditTagPageProps {
  params: {
    name: string;
  };
}

const EdiTagPage = ({ params }: EditTagPageProps) => {
  return (
    <div className="w-full pt-[85px] max-[1280px]:px-4">
      <h1 className="text-4xl font-bold first-letter:uppercase">
        Изменить - {params.name}
      </h1>
      <CreateEditTagForm />
    </div>
  );
};
export default EdiTagPage;
