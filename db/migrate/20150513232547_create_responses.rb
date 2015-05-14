class CreateResponses < ActiveRecord::Migration
  def change
    create_table :responses do |t|
      t.string :api_id
      t.text :result

      t.timestamps null: false
    end
    add_index :responses, :api_id
  end
end
