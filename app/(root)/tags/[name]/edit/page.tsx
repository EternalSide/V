import CreateEditTagForm from "@/components/forms/CreateEditTagForm";

interface EditTagPageProps {
  params: {
    name: string;
  };
}

const EdiTagPage = ({ params }: EditTagPageProps) => {
  return (
    <div className="pt-[85px] w-full max-[1280px]:px-4">
      <h1 className="font-bold text-4xl first-letter:uppercase">
        Изменить - {params.name}
      </h1>
      <CreateEditTagForm />
    </div>
  );
};
export default EdiTagPage;
